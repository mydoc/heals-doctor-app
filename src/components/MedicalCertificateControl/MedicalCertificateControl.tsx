import { IMedicalCertificate } from '../../interfaces/records';
import { User } from '../../interfaces/user';
import { Wrapper } from './MedicalCertificateControl.styles';

interface MedicalCertificateControlProps {
    patient: User,
    doctor: User
    onSubmit: (mc: IMedicalCertificate) => void;
}

const MedicalCertificateControl = ({ patient, doctor, onSubmit }: MedicalCertificateControlProps) => {

    return (
        <Wrapper>
            <div>
                <h1>Medical Certificate</h1>
            </div>
            <div>
                <div>
                    <div>Medical Certification No.</div>
                    <div>...</div>
                </div>
                <div>
                    <div>Issued Date</div>
                    <div>{ Date().toString() }</div>
                </div>
            </div>
            <div>
                <div>
                    <div>Patient Name</div>
                    <div>...</div>
                </div>
                <div>
                    <div>Patient Birthdate</div>
                    <div>{patient.birthdate.toDateString()}</div>
                </div>
                <div>
                    <div>Patient Id</div>
                    <div>{patient.nationalId}</div>
                </div>
            </div>
        </Wrapper>
    )

}

export default MedicalCertificateControl;
