const express = require("express");
const router = require("express").Router();

const v1Routes = require("./v1");

router.get("/", (req, res) => {
    res.json({
        message: "API is running",
        version: "1.0.0",
        endpoints: {
            v1: "/api/v1"
        }
    });
});

router.use("/v1", v1Routes);

module.exports = router;
