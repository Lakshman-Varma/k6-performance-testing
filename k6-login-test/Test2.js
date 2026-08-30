import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 10 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<1000'],
    checks: ['rate>0.90'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}