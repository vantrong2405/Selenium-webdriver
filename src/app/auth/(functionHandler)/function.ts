import { TestCase } from '../../../constants/data';
export const registerUser = async (userData: any) => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (response.ok) {
            console.log('User created:', data)
        } else {
            console.error('Error:', data)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}


export const getAllUsers = async () => {
    try {
        const response = await fetch('/api/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            console.log(data)
        } else {
            console.error('Error:', data)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        console.log('data:', data);

        if (response.ok) {
            return {
                status: true,
                data
            }
        } else {
            return {
                status: false,
                data
            }
        }
    } catch (error) {
        console.error('Lỗi khi gọi API đăng nhập:', error)
        return null
    }
}

export const callTest = async (item: any) => {
    const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    const data = await response.json()
    if (response.ok) {
        return {
            status: 'PASSED',
            data
        }
    } else {
        return {
            status: 'FAILED',
            data
        }
    }
}

export const checkUniqueEmail = async (email: string) => {
    try {
        const response = await fetch(`/api/login?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data

    } catch (error) {
        console.error('Lỗi khi gọi API kiểm tra email:', error)
        return null
    }
}