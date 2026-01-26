# Buzzbuy E-Commerce Web

<br />
<div align="center">
  <a href="https://github.com/srishtigupta1234/Buzzbuy_Ecommerce_Web">
    <img src="frontend/src/assets/logo.png" alt="Buzzbuy Logo" width="100" height="100">
  </a>

  <h3 align="center">Buzzbuy</h3>

  <p align="center">
    A robust, full-stack e-commerce solution engineered for performance and scalability.
    <br />
    <a href="https://github.com/srishtigupta1234/Buzzbuy_Ecommerce_Web"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://buzzbuyecommerce.vercel.app">View Live </a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#key-features">Key Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

**Buzzbuy** is a comprehensive e-commerce application built to simulate a real-world online shopping experience. This project demonstrates the integration of a React-based frontend with a robust Spring Boot backend, handling complex business logic such as inventory management, secure user authentication, and payment processing.

The application is fully deployed, utilizing **Railway** for the backend infrastructure and **Vercel** for frontend delivery, ensuring high availability and low latency.


### Tech Stack

**Frontend:**
* [![React][React.js]][React-url]
* [![Tailwind CSS][Tailwind-badge]][Tailwind-url]
* [![JavaScript][Javascript-badge]][Javascript-url]
* [![Vercel][Vercel-badge]][Vercel-url]

**Backend & Database:**
* [![Java][Java-badge]][Java-url]
* [![Spring Boot][SpringBoot-badge]][SpringBoot-url]
* [![MySQL][MySQL-badge]][MySQL-url]
* [![Railway][Railway-badge]][Railway-url]

**Services & Tools:**
* [![Razorpay][Razorpay-badge]][Razorpay-url]
* [![Postman][Postman-badge]][Postman-url]

## Key Features

* **🔐 Secure Authentication:** Implemented JWT (JSON Web Tokens) based authentication and authorization with Spring Security to protect user data and admin routes.
* **🛒 Dynamic Cart Management:** Real-time shopping cart functionality allowing users to add, update, and remove products seamlessly.
* **💳 Payment Integration:** Fully functional payment gateway integration using **Razorpay** to handle safe and secure transactions.
* **📦 Product Management:** RESTful APIs designed to handle product CRUD operations, categorization, and inventory tracking.
* **📱 Responsive UI:** Mobile-first design approach using **Tailwind CSS** ensuring a consistent experience across all devices.
* **☁️ Cloud Deployment:** CI/CD pipelines configured for automated deployment to Vercel (Client) and Railway (Server).


## Getting Started

To set up this project locally, follow the steps below.

### Prerequisites

* **Java Development Kit (JDK):** Version 17 or higher.
* **Node.js:** Version 14 or higher.
* **MySQL:** Local instance running or a cloud database URL.
* **Maven:** For dependency management (usually included as `./mvnw`).

### Installation

#### 1. Clone the Repository
```sh
git clone [https://github.com/srishtigupta1234/Buzzbuy_Ecommerce_Web.git](https://github.com/srishtigupta1234/Buzzbuy_Ecommerce_Web.git)
cd Buzzbuy_Ecommerce_Web

```

#### 2. Backend Setup (Spring Boot)

Navigate to the backend directory:

```sh
cd backend

```

Configure your database in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/buzzbuy_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# Add Razorpay keys here
razorpay.key.id=your_key_id
razorpay.key.secret=your_key_secret

```

Run the application:

```sh
./mvnw spring-boot:run

```

#### 3. Frontend Setup (React)

Open a new terminal and navigate to the frontend directory:

```sh
cd frontend

```

Install dependencies:

```sh
npm install

```

Configure environment variables in a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api

```

Run the development server:

```sh
npm run dev

```

## Roadmap

* [x] Initial Setup & Database Connection
* [x] User Authentication (Login/Register)
* [x] Product Listing & Search
* [x] Shopping Cart Implementation
* [x] Razorpay Payment Gateway Integration
* [ ] User Reviews & Ratings System
* [ ] Admin Dashboard Analytics

## 📬 Contact

**Srishti Gupta**
<br />
Full Stack Developer
<br />
[![LinkedIn][LinkedIn-badge]][LinkedIn-url] [![Email][Email-badge]][Email-url]

Project Link: [https://github.com/srishtigupta1234/Buzzbuy_Ecommerce_Web](https://github.com/srishtigupta1234/Buzzbuy_Ecommerce_Web)


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Javascript-badge]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Java-badge]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.java.com/
[SpringBoot-badge]: https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[SpringBoot-url]: https://spring.io/projects/spring-boot
[MySQL-badge]: https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Razorpay-badge]: https://img.shields.io/badge/Razorpay-0C2444?style=for-the-badge&logo=razorpay&logoColor=white
[Razorpay-url]: https://razorpay.com/
[Vercel-badge]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Railway-badge]: https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white
[Railway-url]: https://railway.app/
[Postman-badge]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[Postman-url]: https://postman.com

[LinkedIn-badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[LinkedIn-url]: https://www.linkedin.com/in/srishtigupta1/
[Email-badge]: https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white
[Email-url]: mailto:srishtigupta97527@gmail.com
