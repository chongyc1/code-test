import { Col, Row } from 'antd';
import React from 'react';

interface InfoProps {
  title: string;
  value: any;
  isStatus?: boolean;
}

const ContactInfo = ({ title, value, isStatus }: InfoProps) => {
  return <>
    <Row className='contact_info_row'>
      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
        <span className='title'>{title}:</span>
      </Col>
      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
        <span className={`value ${isStatus ? value === "Alive" ? 'is_alive' : 'is_not_alive' : ''}`}>
          {value === undefined ? "-" : value}
        </span>
      </Col>
    </Row>
  </>;
}

export default ContactInfo;