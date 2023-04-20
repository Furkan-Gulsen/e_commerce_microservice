# E Commerce Microservice

## Use Cases

- Seller can sale products online
- Buyer can buy product online
- Transaction will take place between C2C
- A commision of % will be charged per final transaction
- Notification or communication channel needed to collaborate buyer and saller

## System Design

1. Functional Requirements
2. Non Functional Requirements
3. Data Storage Requirements

### Functional Requirements

- User Sign-up / Login functionality
- User verification with OTP
- User can become seller / buyer
- Seller can Create / Update / Delete Products
- Buyer can purchase product using online payment (Card / Online Banking etc)
- Seller can receive payout
- Email / message notification 8. Online chat with Seller & buyer

### Non Functional Requirements

- System should be to highly available in cloud with multiple region because this is C2C portal
- System should maintain best practices to able to scale horizontally at any level
- System should design the way can be break down to microservices
- Loosely coupled services and communications
- It should have mechanism for logging and monitoring to inspect services health and availability
- System should design with documentation for better scope of usability to understand the architecture and business logic of the API usages.
- Should follow CQRS

### Data Storage Requirements

- Should consistent or eventually consistent
- Should follow CAP theorem
- Distributed database system and high availability
- High availability of Object Storage for multiple regions

## Tech Stack

- NodeJS
- MongoDB
- PostgreSQL
- GraphlQL
- Serverless (AWS Lambda)
- AWS CDK
- AWS ECS
- AWS EC2
- AWS S3
- AWS Cloudformation
- AWS Api Gateway
