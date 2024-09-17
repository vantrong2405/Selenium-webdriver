export const initTestCase: TestCase[] = [
    {
        name: 'Register with password not match',
        status: 'PENDING',
        code: 'Case01'
    },
    {
        name: 'Register with correct data',
        status: 'PENDING',
        code: 'Case02'
    },
    {
        name: 'Register with existed email',
        status: 'PENDING',
        code: 'Case03'
    },
    {
        name: 'Login with invaild username or password',
        status: 'PENDING',
        code: 'Case04'
    },
    {
        name: 'Login with correct username & password',
        status: 'PENDING',
        code: 'Case05'
    }
]

export interface TestCase {
    name: string
    status: 'PASSED' | 'FAILED' | 'PENDING'
    code: string
}