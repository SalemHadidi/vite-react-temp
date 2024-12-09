// PlanPage.tsx
import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
// import './PlanPage.css'; // Optional: Add custom styling

const { Title, Paragraph } = Typography;

const plans = [
  {
    name: 'Free Plan',
    price: 'Free',
    description: '1 upload and 100 questions per month.',
    features: ['1 Upload', '100 Questions'],
    current: true,
  },
  {
    name: 'Pro Plan',
    price: '$15/month or $10/month (billed annually)',
    description: '100 uploads and 1,000 questions per month.',
    features: ['100 Uploads', '1,000 Questions'],
    current: false,
  },
  {
    name: 'Unlimited Plan',
    price: '$50/month or $30/month (billed annually)',
    description: 'Unlimited uploads and questions.',
    features: ['Unlimited Uploads', 'Unlimited Questions'],
    current: false,
  },
];

const PlanPage: React.FC = () => {
  return (
    <div className="plan-page">
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Choose Your Plan
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {plans.map((plan) => (
          <Col key={plan.name} xs={24} sm={12} md={8}>
            <Card
              title={plan.name}
              bordered={true}
              className={plan.current ? 'current-plan' : ''}
              extra={plan.current ? <span>Current Plan</span> : null}
            >
              <Paragraph>{plan.description}</Paragraph>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              {!plan.current && <Button type="primary">Select</Button>}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PlanPage;
