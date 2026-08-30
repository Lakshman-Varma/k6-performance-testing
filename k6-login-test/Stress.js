import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 10 },   // Normal load
        { duration: '1m', target: 25 },   // Increase load
        { duration: '1m', target: 50 },   // Higher load
        { duration: '1m', target: 75 },   // Stress level
        { duration: '1m', target: 100 },  // Heavy stress
        { duration: '1m', target: 0 },    // Ramp down
    ],

    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.10'],
        checks: ['rate>0.90'],
    },
};

export default function () {

    const response = http.get('https://test.k6.io/');

    check(response, {
        'status is 200': (r) => r.status === 200,
        'response time < 2 seconds': (r) => r.timings.duration < 2000,
    });

    sleep(1);
}