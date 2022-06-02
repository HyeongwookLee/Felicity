import React, { useContext, useState } from "react"
import Header from '../../Components/Header/Header';
import { Mostouter, Directory, User, Cat, Video } from '../../Components/mostouter';
import Path from '../../Components/Path';
import Login from '../../Components/Login';

import {
    ContentLayout,
    EmergencyBox,
    ScheduleBox,
    RecordBox,
    PrescriptionBox,
    ConversationBox,
    Block,
    Button,
    Container
} from "./layout"
import Schedule from "../../Components/Schedule";
import Conversations from "../../Components/Conversations";
import Emergency from "../../Components/Emergency";
import PatientRecord from "../../Components/PatientRecord";
import RecentPrescription from "../../Components/RecentPrescription";
import Axios from "axios";
import UserRedirect from "../UserRedirect"

import API_URL from "../../API/server-ip";
import { SocketContext } from '../../API/video'

function Patient() {

    const jwt = JSON.parse(sessionStorage.getItem("jwt"))
    const show = JSON.parse(sessionStorage.getItem("show"))
    const [convIdData, setConvIdData] = React.useState([]);
    const [doctorIdData, setDoctorIdData] = React.useState([]);
    const [scheduleData, setScheduleData] = React.useState([])
    const [visible, setVisible] = useState(true)

    const { startCall, send } = useContext(SocketContext);

    React.useEffect(() => {
        Axios.post(`${API_URL}/patient_schedule`, { "patient_id": jwt })
            .then((response) => {
                setScheduleData(response.data)
            })
    }, [])
    console.log(scheduleData);

    React.useEffect(() => {
        Axios.post(`${API_URL}/patient_conv`, { "patient_id": jwt })
            .then((response) => {
                setConvIdData(response.data[0].convId);
                setDoctorIdData(response.data[0].doctorIds);
            })
    }, [])
    console.log(convIdData);
    console.log(doctorIdData);


    function CloseSession() {
        window.sessionStorage.removeItem('show');

    }

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
                {visible && show && <Container>
                    <Block>Video call Ended
                        <Button onClick={() => { CloseSession(); setVisible(false); }}>
                            Okay
                        </Button>
                    </Block>
                </Container>}
                <ContentLayout>
                    <EmergencyBox>
                        <Emergency />
                    </EmergencyBox>

                    <ScheduleBox>
                        <Schedule startCall={startCall} schedule_data={scheduleData} />
                    </ScheduleBox>

                    <RecordBox>
                        <PatientRecord />
                    </RecordBox>

                    <PrescriptionBox>
                        <RecentPrescription />
                    </PrescriptionBox>

                    <ConversationBox>
                        <Conversations/>
                    </ConversationBox>
                </ContentLayout>
            </Video>

        </Mostouter>


    );
}

export default Patient;