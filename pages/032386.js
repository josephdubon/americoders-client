import StudentRegistrationForm from '../components/forms/StudentRegisterForm'
import {Col, Row} from 'antd'

const SecretSignUp = () => {
    return (<>
        <Row justify='center p-5 m-5'>
            <Col>
                <h1>Secret Signup Page</h1>
                <StudentRegistrationForm/>
            </Col>
        </Row>
    </>)
}

export default SecretSignUp