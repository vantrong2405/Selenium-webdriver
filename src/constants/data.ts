export const initTestCase: TestCase[] = [
    {
        name: 'Đăng ký tài khoản với mật khẩu không khớp',
        status: 'PENDING',
        code: 'Case01'
    },
    {
        name: 'Đăng ký tài khoản thành công',
        status: 'PENDING',
        code: 'Case02'
    },
    {
        name: 'Đăng ký bằng email đã tồn tại',
        status: 'PENDING',
        code: 'Case03'
    },
    {
        name: 'Đăng nhập bằng tên người dùng hoặc mật khẩu không hợp lệ',
        status: 'PENDING',
        code: 'Case04'
    },
    {
        name: 'Đăng nhập thành công',
        status: 'PENDING',
        code: 'Case05'
    },
    {
        name: 'Đổi mật khẩu thành công',
        status: 'PENDING',
        code: 'Case06'
    },
]

export interface TestCase {
    name: string
    status: 'PASSED' | 'FAILED' | 'PENDING'
    code: string
}