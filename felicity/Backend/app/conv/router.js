var conv = require("./conv_model");
var router = require("express").Router();

function getDoctorConvList(req, res) {
    const doctor_id = req.body.doctor_id;
    var convIds = [];
    var patientIds = [];
    conv.findDConvs(doctor_id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed on getting patient_ids." })
        }
        else {
            for (i in result) {
                convIds.push(result[i].conv.conv_id);
                patientIds.push(result[i].conv.patient_id);
            }
            res.json(convIds);
            res.json(patientIds);
        }
    });
}

function getPatientConvList(req, res) {
    const patient_id = req.body.patient_id;
    var convIds = [];
    var doctorIds = [];
    conv.findPConvs(patient_id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed on getting doctor_ids." })
        }
        else {
            for (i in result) {
                convIds.push(result[i].conv.conv_id);
                doctorIds.push(result[i].conv.doctor_id);
            }
            res.json(convIds);
            res.json(doctorIds);
        }
    });
}

function getChats(req, res) {
    const conv_id = req.body.conv_id;
    var chatArr = [];
    var timeArr = [];
    conv.findChat(conv_id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed on getting chats." })
        }
        else {
            for (i in result) {
                chatArr.push(result[i].chat.message);
                timeArr.push(result[i].date);
            }
            res.json(chatArr)
            res.json(timeArr);
        }
    });
}

function postConvList(req, res) {
    const conv_id = req.body.conv_id;
    const doctor_id = req.body.doctor_id;
    const patient_id = req.body.patient_id;
    conv.insertConv(conv_id, doctor_id, patient_id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed on creating conversation" })
        }
    });
}

function postChat(req, res) {
    const chat_id = req.body.chat_id;
    const conv_id = req.body.conv_id;
    const message = req.body.message;
    const time = req.body.time;
    const is_doctor = req.body.is_doctor;
    conv.insertChat(chat_id, conv_id, message, time, is_doctor, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed on creating conversation" })
        }
    });
}

router.post("/doctor_conv", getDoctorConvList);
router.post("/patient_conv", getPatientConvList);
router.post("/get_chat_conv", getChats);
router.post("/list_conv", postConvList);
router.post("/post_chat_conv", postChat);

module.exports = router;