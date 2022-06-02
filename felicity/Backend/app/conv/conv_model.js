const config = require("../config");
var conv = module.exports;

// user가 doctor일때 conv라는 table에서 conv_id들만 가져와서 conversation list에 띄우기 위함
const readDConvQry =
    "SELECT conv.conv_id, conv.patient_id " +
    "FROM conv " +
    "WHERE conv.doctor_id = (?)";

// user가 patient일때 conv라는 table에서 conv_id들만 가져와서 conversation list에 띄우기 위함
const readPConvQry =
    "SELECT conv.conv_id, conv.doctor_id " +
    "FROM conv " +
    "WHERE conv.patient_id = (?)";

// chats라는 table에서 특정 doctor이랑 특정 patient가 대화한 내용 가져와서 conversation chat에 띄움
const readChatQry =
    "SELECT chats.message, date_format((chats.time), '%Y/%m/%d %l:%i %p') AS date" +
    "FROM chats " +
    "WHERE chats.conv_id = (?)";

// conversation list에서 새로운 채팅방이 생기면 conv table에 추가
const insertConvQry =
    "INSERT INTO felicity.conv " +
    "(`conv_id`, `doctor_id`, `patient_id`) " +
    "VALUES (?, ?, ?)";

// patient나 doctor가 chatting하면 chats table에 추가
const insertChatQry =
    "INSERT INTO felicity.chat " +
    "(`chat_id`, `conv_id`, `message`, `time`, `is_doctor`) " +
    "VALUES (?, ?, ?, ?, ?)";

conv.findDConvs = function findDConvs(doctor_id, callback) {
    config.db.query(readDConvQry, doctor_id, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}

conv.findPConvs = function findPConvs(patient_id, callback) {
    config.db.query(readPConvQry, patient_id, (err, result) => {
        if (err) callback(err, null);

        callback(null, result)
    });
}

conv.findChat = function findChat(conv_id, callback) {
    config.db.query(readChatQry, conv_id, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}

conv.insertConv = function insertConv(conv_id, doctor_id, patient_id, callback) {
    const ids = [conv_id, doctor_id, patient_id];
    config.db.query(insertConvQry, ids, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}

conv.insertChat = function insertChat(chat_id, conv_id, message, time, is_doctor, callback) {
    const chat = [chat_id, conv_id, message, time, is_doctor];
    config.db.query(insertChatQry, chat, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    });
}