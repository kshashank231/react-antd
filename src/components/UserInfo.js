import React from "react";
import { Card, Col, Row } from 'antd';

const UserCard = ({ keyType, value }) => {
  return (
    <Row style={{ marginTop: 16, textAlign: 'left' }} gutter={24}>
      <Col span={4}>
        <Card bodyStyle={{fontWeight: 'bold'}}>
          {keyType}
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          {value}
        </Card>
      </Col>
    </Row>
  );
}

export const UserInfo = ({data}) => {
  console.log('ui', data)
  return (
    <div>
      <UserCard keyType="Name" value={`${data.firstname}  ${data.lastname}`} />
      <UserCard keyType="Email" value={data.email} />
      <UserCard keyType="Phone Number" value={`+${data.prefix}-${data.phone}`} />
    </div>
  )
}