import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const unexpectedResponses = new Rate('unexpected_responses');

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {

    stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 25 },
        { duration: '20s', target: 50 },
        { duration: '20s', target: 50 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<500'],
        checks: ['rate>=0.90'],
        unexpected_responses: ['rate<0.01'],
    },
};

const users = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        expectedStatus: 200,
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedStatus: 403,
    },
    {
        username: 'problem_user',
        password: 'secret_sauce',
        expectedStatus: 200,
    },
    {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        expectedStatus: 200,
    },
    {
        username: 'error_user',
        password: 'secret_sauce',
        expectedStatus: 200,
    },
    {
        username: 'visual_user',
        password: 'secret_sauce',
        expectedStatus: 200,
    },
];

export default function () {

    const user = users[(__VU + __ITER) % users.length];

    const payload = JSON.stringify({
        username: user.username,
        password: user.password,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(
        `${BASE_URL}/auth/login`,
        payload,
        params
    );

    unexpectedResponses.add(
        response.status !== user.expectedStatus
    );

    check(response, {
        'HTTP status is correct': function (r) {
            return r.status === user.expectedStatus;
        },

        'response body is received': function (r) {
            return r.body !== '';
        },
    });

    if (user.expectedStatus === 200) {

        check(response, {
            'login successful message': function (r) {
                return r.json('message') === 'Login successful';
            },
        });
    }

    sleep(1);
}