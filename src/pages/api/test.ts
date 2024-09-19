import { Builder, By, WebDriver, WebElement, until } from 'selenium-webdriver';
import { NextApiRequest, NextApiResponse } from 'next';


async function slowType(driver: WebDriver, element: WebElement, text: string) {
    for (const char of text) {
        await element.sendKeys(char);
        await driver.sleep(15);
    }
}

async function Case01() {
    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/auth/register');
        const fullnameElement = await driver.findElement(By.name('fullname'));
        const phoneNumberElement = await driver.findElement(By.name('phoneNumber'));
        const emailElement = await driver.findElement(By.name('email'));
        const passwordElement = await driver.findElement(By.name('password'));
        const confirmPasswordElement = await driver.findElement(By.name('confirmPassword'));

        await slowType(driver, fullnameElement, 'Doan Vo van Trong');
        await slowType(driver, phoneNumberElement, '0357407264');
        await slowType(driver, emailElement, 'trongdn2405@gmail.com');
        await slowType(driver, passwordElement, '123123');
        await slowType(driver, confirmPasswordElement, '123123Errors');
        await driver.findElement(By.css('button[type="submit"]')).click();
        let messages = until.elementLocated(By.xpath("//*[contains(text(), 'Passwords do not match - Please try again.')]"))
        if (messages) {
            console.log('Test case passed: Correct error message displayed.');
        } else {
            throw new Error('Test case failed: Incorrect error message displayed.');
        }
    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
    } finally {
        await driver.quit();
    }
}

async function Case02() {
    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/auth/register');
        const fullnameElement = await driver.findElement(By.name('fullname'));
        const phoneNumberElement = await driver.findElement(By.name('phoneNumber'));
        const emailElement = await driver.findElement(By.name('email'));
        const passwordElement = await driver.findElement(By.name('password'));
        const confirmPasswordElement = await driver.findElement(By.name('confirmPassword'));

        await slowType(driver, fullnameElement, 'Doan Vo van Trong');
        await slowType(driver, phoneNumberElement, '0357407264');
        await slowType(driver, emailElement, 'trongdn2401115@gmail.com');
        await slowType(driver, passwordElement, '123123');
        await slowType(driver, confirmPasswordElement, '123123');
        await driver.findElement(By.css('button[type="submit"]')).click()
        let messages = until.elementLocated(By.xpath("//*[contains(text(), 'Account registered successfully.')]"))
        if (messages) {
            console.log('Test case passed: Correct error message displayed.');
        } else {
            throw new Error('Test case failed: Incorrect error message displayed.');
        }
    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
    } finally {
        await driver.quit();
    }
}

async function Case03() {
    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/auth/register');
        const fullnameElement = await driver.findElement(By.name('fullname'));
        const phoneNumberElement = await driver.findElement(By.name('phoneNumber'));
        const emailElement = await driver.findElement(By.name('email'));
        const passwordElement = await driver.findElement(By.name('password'));
        const confirmPasswordElement = await driver.findElement(By.name('confirmPassword'));

        await slowType(driver, fullnameElement, 'Doan Vo van Trong');
        await slowType(driver, phoneNumberElement, '0357407264');
        await slowType(driver, emailElement, 'trongdn2405@gmail.com');
        await slowType(driver, passwordElement, '123123');
        await slowType(driver, confirmPasswordElement, '123123');
        await driver.findElement(By.css('button[type="submit"]')).click()
        let messages = until.elementLocated(By.xpath("//*[contains(text(), 'Email already exists - Please try again.')]"))
        if (messages) {
            console.log('Test case passed: Correct error message displayed.');
        } else {
            throw new Error('Test case failed: Incorrect error message displayed.');
        }
    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
    } finally {
        await driver.sleep(1000);
        await driver.quit();
    }
}

async function Case04() {
    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/auth/login');
        const emailElement = await driver.findElement(By.name('email'));
        const passwordElement = await driver.findElement(By.name('password'));
        await slowType(driver, emailElement, 'trongdn2405@gmail.com');
        await slowType(driver, passwordElement, '123123Error');
        await driver.findElement(By.css('button[type="submit"]')).click()
        let messages = until.elementLocated(By.xpath("//*[contains(text(), 'Login failed - Please check your email and password.')]"))
        if (messages) {
            console.log('Test case passed: Correct error message displayed.');
        } else {
            throw new Error('Test case failed: Incorrect error message displayed.');
        }
    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
    } finally {
        await driver.sleep(1000);
        await driver.quit();
    }
}

async function Case05() {
    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/auth/login');
        const emailElement = await driver.findElement(By.name('email'));
        const passwordElement = await driver.findElement(By.name('password'));
        await slowType(driver, emailElement, 'trongdn2405@gmail.com');
        await slowType(driver, passwordElement, '123123');
        await driver.findElement(By.css('button[type="submit"]')).click()
        let messages = until.elementLocated(By.xpath("//*[contains(text(), 'Welcome back!')]"))
        if (messages) {
            console.log('Test case passed: Correct error message displayed.');
        } else {
            throw new Error('Test case failed: Incorrect error message displayed.');
        }
    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
    } finally {
        await driver.sleep(1000);
        await driver.quit();
    }
}

async function Case06() {
    const profileString = localStorage.getItem('profile');
const profile = profileString ? JSON.parse(profileString) : null;
console.log(profile);

    let driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/auth/change-password'); 
        
        const emailElement = await driver.findElement(By.name('email'));
        const currentPasswordElement = await driver.findElement(By.name('currentPassword'));
        const newPasswordElement = await driver.findElement(By.name('newPassword'));
        const confirmNewPasswordElement = await driver.findElement(By.name('confirmNewPassword'));

        await slowType(driver, emailElement, profile.email); // Use a valid current password
        await slowType(driver, currentPasswordElement, 'oldpassword123'); // Use a valid current password
        await slowType(driver, newPasswordElement, 'newpassword123');
        await slowType(driver, confirmNewPasswordElement, 'newpassword123');
        await driver.findElement(By.css('button[type="submit"]')).click();

        let successMessage = until.elementLocated(By.xpath("//*[contains(text(), 'Password changed successfully.')]"));
        let errorMessage = until.elementLocated(By.xpath("//*[contains(text(), 'Password change failed - Please try again.')]"));

        try {
            await driver.wait(successMessage, 5000);
            console.log('Test case passed: Password change successful.');
        } catch {
            await driver.wait(errorMessage, 5000);
            console.log('Test case failed: Password change failed or incorrect message.');
        }

    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
    } finally {
        await driver.quit();
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        switch (req.body) {
            case 'Case01':
                try {
                    await Case01();
                    res.status(200).json({ message: 'Success' });
                } catch (error) {
                    res.status(500).json({ error: 'Lỗi server' });
                }
                break;
            case 'Case02':
                try {
                    await Case02();
                    res.status(200).json({ message: 'Success' });
                } catch (error) {
                    res.status(500).json({ error: 'Lỗi server' });
                }
                break;
            case 'Case03':
                try {
                    await Case03();
                    res.status(200).json({ message: 'Success' });
                } catch (error) {
                    res.status(500).json({ error: 'Lỗi server' });
                }
                break;
            case 'Case04':
                try {
                    await Case04();
                    res.status(200).json({ message: 'Success' });
                } catch (error) {
                    res.status(500).json({ error: 'Lỗi server' });
                }
                break;
            case 'Case05':
                try {
                    await Case05();
                    res.status(200).json({ message: 'Success' });
                } catch (error) {
                    res.status(500).json({ error: 'Lỗi server' });
                }
                break;
            case 'Case06':
                try {
                    await Case06();
                    res.status(200).json({ message: 'Success' });
                } catch (error) {
                    res.status(500).json({ error: 'Lỗi server' });
                }
                break;
            default:
                break;
        }
    }
}