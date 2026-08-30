import http from 'k6/http';
import { check, sleep } from 'k6';


//commented out stages to run the test without stages
export default function () {
  const res = http.get('https://test.k6.io');

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}