import http from 'k6/http';
import { group, check } from 'k6';

const BASE_URL = 'http://test.k6.io';

export default function () {

    group('Open News Page', () => {

        const response = http.get(`${BASE_URL}/news.php`);

        check(response, {
            'Status is 200': (r) => r.status === 200,
        });

    });

}