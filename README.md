# 🚀 K6 Performance Testing Project

A practical **performance and API testing project using Grafana k6**, JavaScript, Node.js, and Express.js.

This project demonstrates different performance testing techniques, API load testing, login testing, checks, thresholds, test data handling, and HTML reporting using k6.

---

## 📌 Project Overview

The objective of this project is to build hands-on experience in **performance testing and API testing using k6**.

The project covers:

* Load Testing
* Stress Testing
* Spike Testing
* API Performance Testing
* Login Performance Testing
* Data-driven testing
* HTTP request validation
* Checks and thresholds
* Performance metrics
* HTML test reports
* Node.js + Express API integration
* Git & GitHub version control

---

## 🛠️ Technologies & Tools

| Technology / Tool | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| **k6**            | Performance and load testing                      |
| **JavaScript**    | Writing k6 test scripts                           |
| **Node.js**       | Running the local API server                      |
| **Express.js**    | Creating REST API endpoints                       |
| **Postman**       | API functional testing                            |
| **VS Code**       | Development environment                           |
| **Git**           | Version control                                   |
| **GitHub**        | Source code repository                            |
| **SQL**           | Database testing and performance testing concepts |

---

## 📂 Project Structure

```text
k6-performance-testing/
│
├── k6-login-test/
│   │
│   ├── api/
│   │   └── server.js
│   │
│   ├── login-test.js
│   ├── Test1.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
│
├── README.md
└── .gitignore
```

> `node_modules` is excluded from GitHub using `.gitignore`.

---

# 🧪 Performance Tests

## 1. Load Testing

Load testing verifies how the application performs under expected levels of user traffic.

Example scenarios:

* Multiple virtual users
* Login requests
* API requests
* Homepage requests
* Continuous requests for a specified duration

Example k6 configuration:

```javascript
export const options = {
    vus: 5,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(95)<500'],
        checks: ['rate>=0.90'],
    },
};
```

---

## 2. Stress Testing

Stress testing gradually increases the load to identify the application's breaking point.

Example:

```javascript
export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '30s', target: 25 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 0 },
    ],
};
```

The objective is to identify:

* Maximum supported load
* Response-time degradation
* Error rate
* Resource bottlenecks
* System stability

---

## 3. Spike Testing

Spike testing evaluates application behavior when traffic suddenly increases.

Example:

```javascript
export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '5s', target: 10 },
        { duration: '10s', target: 0 },
    ],
};
```

This helps determine whether the application can handle sudden traffic increases and recover after the spike.

---

# 🔐 API Login Performance Test

The project includes a login API performance test using a local Node.js + Express server.

### API Endpoint

```text
POST /auth/login
```

### Example Request

```json
{
    "username": "standard_user",
    "password": "secret_sauce"
}
```

### Successful Login

A successful login returns:

```text
HTTP 200
```

along with an authentication token.

The token can then be used for authenticated API requests.

---

# 👥 Test Data

The login test supports multiple users.

Example:

```json
[
    {
        "username": "standard_user",
        "password": "secret_sauce"
    },
    {
        "username": "locked_out_user",
        "password": "secret_sauce"
    },
    {
        "username": "problem_user",
        "password": "secret_sauce"
    },
    {
        "username": "performance_glitch_user",
        "password": "secret_sauce"
    },
    {
        "username": "error_user",
        "password": "secret_sauce"
    },
    {
        "username": "visual_user",
        "password": "secret_sauce"
    }
]
```

The test uses different login users to validate both successful and unsuccessful authentication scenarios.

---

# 📊 Checks

k6 checks are used to validate API responses.

Example:

```javascript
check(response, {
    'Response status is 200': (r) => r.status === 200,
    'Response contains token': (r) => r.json('token') !== undefined,
});
```

Checks help determine whether individual requests are functionally successful.

---

# 🎯 Thresholds

Thresholds define the performance criteria that the test must satisfy.

Example:

```javascript
thresholds: {
    http_req_duration: ['p(95)<500'],
    checks: ['rate>=0.90'],
}
```

### Example criteria

* 95% of requests should complete within **500 ms**
* At least **90% of checks** should pass

If a threshold fails, k6 marks the test as failed.

---

# 📈 Important k6 Metrics

The project monitors important performance metrics such as:

| Metric              | Description                      |
| ------------------- | -------------------------------- |
| `http_req_duration` | Total request duration           |
| `http_req_failed`   | Percentage of failed requests    |
| `http_reqs`         | Total HTTP requests              |
| `http_req_waiting`  | Time waiting for server response |
| `vus`               | Current virtual users            |
| `vus_max`           | Maximum virtual users            |
| `iterations`        | Completed iterations             |
| `checks`            | Passed/failed validation checks  |
| `data_received`     | Amount of response data received |
| `data_sent`         | Amount of request data sent      |

---

# 📄 HTML Reporting

The project uses the **k6 Reporter** to generate an HTML performance test report.

Example:

```javascript
import { htmlReport } from
"https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
```

The test can generate:

```text
report.html
```

The report provides a visual representation of the test results and performance metrics.

---

# 🖥️ Running the Local API Server

Navigate to the API project:

```powershell
cd k6-login-test
```

Install dependencies:

```powershell
npm install
```

Start the Express server:

```powershell
node api/server.js
```

Expected output:

```text
Server running on port 3000
```

The API is then available at:

```text
http://localhost:3000
```

---

# ▶️ Running k6 Tests

From the directory containing the k6 script:

```powershell
k6 run login-test.js
```

You can also provide the base URL through an environment variable:

```powershell
k6 run -e BASE_URL=http://localhost:3000 login-test.js
```

---

# 🔄 Test Execution Flow

```text
             Start Test
                 │
                 ▼
        Load Test Configuration
                 │
                 ▼
          Create Virtual Users
                 │
                 ▼
          Send API Request
                 │
                 ▼
         Validate Response
                 │
          ┌──────┴──────┐
          │             │
       Success        Failure
          │             │
          └──────┬──────┘
                 ▼
         Collect Metrics
                 │
                 ▼
       Evaluate Thresholds
                 │
                 ▼
          Generate Report
                 │
                 ▼
             Test End
```

---

# 🌐 API Endpoints

The local Express server contains API endpoints used for k6 performance testing.

| Method | Endpoint      | Purpose                      |
| ------ | ------------- | ---------------------------- |
| `POST` | `/auth/login` | Authenticate user            |
| `GET`  | `/users`      | Retrieve users               |
| `GET`  | `/...`        | Additional APIs can be added |

Authenticated endpoints can be tested using:

```text
Authorization: Bearer <token>
```

---

# 📚 Skills Demonstrated

This project demonstrates practical knowledge of:

### Performance Testing

* Load testing
* Stress testing
* Spike testing
* Virtual users
* Performance metrics
* Response-time analysis
* Throughput
* Error rate
* Bottleneck identification

### API Testing

* GET
* POST
* Request headers
* Request body
* Authentication
* Bearer tokens
* HTTP status codes
* Response validation

### k6

* `http`
* `check`
* `group`
* `sleep`
* `SharedArray`
* Environment variables
* Stages
* Thresholds
* Checks
* HTML reports
* Test data management

### Development & Version Control

* JavaScript
* Node.js
* Express.js
* Git
* GitHub
* VS Code

---

# 📌 Future Enhancements

Planned improvements include:

* [ ] Add more API endpoints
* [ ] Add CRUD API performance tests
* [ ] Add database performance testing
* [ ] Integrate SQL queries with performance testing
* [ ] Add more realistic test data
* [ ] Add CI/CD integration
* [ ] Integrate k6 with Grafana
* [ ] Add performance test dashboards
* [ ] Add Docker support
* [ ] Add automated test execution through GitHub Actions

---

# 👨‍💻 Author

**Lakshman Varma Sangadi**

Senior QA Test Engineer | Manual Testing | API Testing | SQL | Performance Testing | k6

📍 Hyderabad, India

🔗 LinkedIn: linkedin.com/in/lakshman-varma-sangadi

---

# ⭐ Project Goal

The goal of this project is to build and demonstrate practical expertise in **API and performance testing using Grafana k6**, while following real-world testing practices such as test data management, authentication, response validation, thresholds, performance metrics, reporting, and version control.
