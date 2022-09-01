import { useEffect, useState } from 'react'
import InstructorRoute from '../../components/routes/InstructorRoute'
import {
  DollarOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import axios from 'axios'
import { stripeCurrencyFormatter } from '../../utils/helpers'
import { PageHead } from '../../components/PageHead/PageHead'

const InstructorRevenue = () => {
  // state
  const [balance, setBalance] = useState({ pending: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    sendBalanceRequest()
  }, [])

  const sendBalanceRequest = async () => {
    // collect data
    const { data } = await axios.get('/api/instructor/balance')

    // update state
    setBalance(data)
  }

  const handlePayoutSettings = async () => {
    try {
      setLoading(true)

      // get login link
      const { data } = await axios.get('/api/instructor/payout-settings')

      // open login in new window
      window.location.href = data

      // update state
      setLoading(false)

    } catch (err) {
      // update state
      setLoading(false)
      console.log(err)

      // send user message
      alert('Unable to access payout settings. Try again later.')
    }
  }

  return (
    <InstructorRoute>

      <PageHead title={'Revenue'}/>

      <Row className="pt-2">
        <Col className="col-md-8 offset-md-2 bg-light p-5">
          <h2>
            Revenue Report <DollarOutlined className="float-end"/>{' '}
          </h2>
          <small>You get paid directly from Stripe to your bank account every 48
                 hours.</small>
          <hr/>
          <h4>
            Pending balance {balance.pending &&
            balance.pending.map((bp, i) => (
              <span key={i} className="float-end">
                    {stripeCurrencyFormatter(bp)}
                  </span>
            ))}
          </h4>
          <small>For 48 Hours</small>
          <hr/>
          <h4>
            Payouts{' '}
            {!loading ?
              <SettingOutlined
                className="float-end"
                role="button"
                onClick={handlePayoutSettings}
              />
              :
              <SyncOutlined
                className="float-end"
                role="button"
              />}
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