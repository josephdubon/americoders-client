import {useEffect, useState} from 'react'
import InstructorRoute from '../../components/routes/InstructorRoute'
import {DollarOutlined, SettingOutlined} from '@ant-design/icons'
import {Col, Row} from 'antd'

const InstructorRevenue = () => {
    // state
    const [balance, setBalance] = useState({pending: []})

    useEffect(() => {
        sendBalanceRequest()
    }, [])

    const sendBalanceRequest = async () => {
        console.log(' send balance request')

    }

    const handlePayoutSettings = async () => {
        console.log('handle payout settings')
    }

    return (
        <InstructorRoute>
            <Row className='pt-2'>
                <Col className='col-md-8 offset-md-2 bg-light p-5'>
                    <h2>
                        Revenue Report <DollarOutlined className='float-end'/>{' '}
                    </h2>
                    <small>You get paid directly from Stripe to your bank account every 48 hours.</small>
                    <hr/>
                    <h4>
                        Pending balance {balance.pending &&
                        balance.pending.map((bp, i) => (
                            <span key={i} className='float-end'>
                    {stripeCurrencyFormatter(bp)}
                  </span>
                        ))}
                    </h4>
                    <small>For 48 Hours</small>
                    <hr/>
                    <h4>
                        Payouts <SettingOutlined
                        className='float-end'
                        role='button'
                        onClick={handlePayoutSettings}
                    />
                    </h4>
                    <small>
                        Update your Stripe account details or view previous payouts.
                    </small>
                </Col>
            </Row>
        </InstructorRoute>
    )
}

export default InstructorRevenue