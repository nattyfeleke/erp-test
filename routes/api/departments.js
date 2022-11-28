const express = require("express");
const router = express.Router();
// const { check, validationResult } = require('express-validator');

const Department = require("../../models/Department");

// @route   GET api/departments/
// @desc    Get all departments without hierarchy
// @access  Public
router.get("/", async (req, res) => {
  try {
    let departments = await Department.find({}).populate(
      "managing_dept children_dept"
    );

    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/departments/hierarchy
// @desc    Get all departments with hierarchy
// @access  Public
router.get("/hierarchy", async (req, res) => {
  try {
    let departments = await Department.find({}).lean();
    const managementStructure = createDataTree(departments);
    res.json(managementStructure[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/departments/
// @desc    Add department
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, description, managing_dept, children_depts } = req.body;
    const has_managing_dept = managing_dept ? true : false;
    const newDepartment = new Department({
      name,
      description,
      has_managing_dept,
    });
    //If the department has a manaing dept, we need to add the new dept to the managing dept's children list
    if (!has_managing_dept) {
      await newDepartment.save();
    } else {
      newDepartment.managing_dept = managing_dept;
      await newDepartment.save();
      const managingDept = await Department.findById(managing_dept);
      managingDept.children_dept.push(newDepartment._id);
      await managingDept.save();
    }
    res.json(newDepartment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/departments/:id
// @desc    Update department
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const { name, description, managing_dept, children_depts } = req.body;
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(400).json({
        errors: [{ msg: "Department does not exists" }],
      });
    }
    const has_managing_dept = managing_dept ? true : false;
    if (name) department.name = name;
    if (description) department.description = description;
    if (managing_dept) {
      if (managing_dept != department.managing_dept) {
        //Remove dept from the previous managng dept
        const previousManagingDept = await Department.findById(
          department.managing_dept
        );
        const removeIndex = previousManagingDept.children_dept.indexOf(
          req.params.id
        );
        previousManagingDept.children_dept.splice(removeIndex, 1);
        await previousManagingDept.save();
        //Update with the new managing dept
        department.managing_dept = managing_dept;
      }
    }
    if (children_depts) department.children_dept = children_depts;
    await department.save();
    res.json(department);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: "There is no department with this id",
      });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/departments/:id
// @desc    delete department by id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    let department = await Department.findOne({ _id: req.params.id });
    if (!department) {
      return res.status(400).json({
        errors: [{ msg: "Department not found" }],
      });
    }
    let managingDept = await Department.findOne({
      _id: department.managing_dept,
    });
    //Remove dept from the managingdept
    const removeIndex = managingDept.children_dept.indexOf(req.params.id);
    managingDept.children_dept.splice(removeIndex, 1);
    await managingDept.save();

    //finally delete the dept from Income database
    await Department.findOneAndRemove({
      _id: req.params.id,
    });

    res.json({ msg: "Department deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: "There is no department with this id",
      });
    }
    res.status(500).send("Server Error");
  }
});

const createDataTree = (dataset) => {
  const hashTable = Object.create(null);
  dataset.forEach(
    (aData) => (hashTable[aData._id] = { ...aData, children_dept: [] })
  );
  const dataTree = [];
  dataset.forEach((aData) => {
    if (aData.managing_dept)
      hashTable[aData.managing_dept].children_dept.push(hashTable[aData._id]);
    else dataTree.push(hashTable[aData._id]);
  });
  return dataTree;
};

module.exports = router;
