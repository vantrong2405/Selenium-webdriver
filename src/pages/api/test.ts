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

        await slowType(driver, fullnameElement, 'Le Minh Tuan');
        await slowType(driver, phoneNumberElement, '0889001505');
        await slowType(driver, emailElement, 'minhtuanledng@gmail.com');
        await slowType(driver, passwordElement, 'hello123');
        await slowType(driver, confirmPasswordElement, 'hello12311');
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

        await slowType(driver, fullnameElement, 'Le Minh Tuan');
        await slowType(driver, phoneNumberElement, '0889001505');
        await slowType(driver, emailElement, 'minhtuanledng@gmail.com');
        await slowType(driver, passwordElement, 'hello123');
        await slowType(driver, confirmPasswordElement, 'hello123');
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

        await slowType(driver, fullnameElement, 'Le Minh Tuan');
        await slowType(driver, phoneNumberElement, '0889001505');
        await slowType(driver, emailElement, 'minhtuanledng@gmail.com');
        await slowType(driver, passwordElement, 'hello123');
        await slowType(driver, confirmPasswordElement, 'hello123');
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
        await slowType(driver, emailElement, 'minhtuanledng@gmail.com');
        await slowType(driver, passwordElement, 'hello12345');
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
        await slowType(driver, emailElement, 'minhtuanledng@gmail.com');
        await slowType(driver, passwordElement, 'hello123');
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
            default:
                break;
        }
    }
}