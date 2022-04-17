import React, { useContext } from "react"
import Header from '../../Components/Header/Header';
import { Mostouter, Directory, User, Cat, Title, Video } from '../../Components/mostouter';
import Path from '../../Components/Path';
import Login from '../../Components/Login';

import {
    ContentLayout,
    EmergencyBox,
    ScheduleBox,
    RecordBox,
    PrescriptionBox,
    ConversationBox
} from "./layout"
import Schedule from "../../Components/Schedule";
import Conversations from "../../Components/Conversations";
import Emergency from "../../Components/Emergency";
import PatientRecord from "../../Components/PatientRecord";
import RecentPrescription from "../../Components/RecentPrescription";
import Axios from "axios";
import UserRedirect from "../UserRedirect"
import { SocketContext } from "../../API/video";

import API_URL from "../../API/server-ip";

function Patient() {

    const jwt = JSON.parse(sessionStorage.getItem("jwt"))

    const { myVideo, role, startCall, callUser, answerCall, userVideo, callAccepted, callEnded, stream, call, isClicked, text, getAudio, stopAudio, chatArr, send } = useContext(SocketContext);
    const context = { myVideo, role, startCall, callUser, answerCall, userVideo, callAccepted, callEnded, stream, call, isClicked, text, getAudio, stopAudio, chatArr, send }

    const [scheduleData, setScheduleData] = React.useState([])

    React.useEffect(() => {
        Axios.post(`${API_URL}/patient_schedule`, { "patient_id": 1 })
            .then((response) => {
                setScheduleData(response.data)
            })
    }, [])
    console.log(scheduleData)

    return (

        <Mostouter>
            {!jwt && <UserRedirect isRole={true} />}

            <Cat>
                <Header isDoctor={false} />
            </Cat>

            <Directory>
                <Path directory="Home" />
            </Directory>

            <User>
                <Login />
            </User>


            <Video>
                <ContentLayout>
                    <EmergencyBox>
                        <Emergency />
                    </EmergencyBox>

                    <ScheduleBox>
                        <Schedule schedule_data={scheduleData} />
                    </ScheduleBox>

                    <RecordBox>
                        <PatientRecord />
                    </RecordBox>

                    <PrescriptionBox>
                        <RecentPrescription />
                    </PrescriptionBox>

                    <ConversationBox>
                        <Conversations context={context}/>
                    </ConversationBox>
                </ContentLayout>
            </Video>

        </Mostouter>


    );
}

export default Patient;