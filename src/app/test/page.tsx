'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table"
import { Button } from '../../components/ui/button'
import { callTest } from '../auth/(functionHandler)/function'
import { TestCase, initTestCase } from '../../constants/data'
import { useToast } from '../../components/ui/use-toast'
  

export default function page() {
    const { toast } = useToast()
    const [testCase, setTestCase] = useState<TestCase[]>(initTestCase)
    const [isExist, setIsExist] = useState(false)
    async function callTestFunc(item: TestCase) {
      callTest(item.code).then((res) => {
          if (item.code === 'Case02' && isExist) {
              toast({
                  title: "Test Failed",
                  description: `Test case ${item.code} is not allowed to run more than once`,
                  variant: "destructive",
              });
              setTestCase(testCase.map((i) => i.code === item.code ? {...i, status: 'FAILED'} : i));
          } else if (item.code === 'Case05' && !isExist) {
              toast({
                  title: "Test Failed",
                  description: `Test case ${item.code} cannot pass because required condition is not met`,
                  variant: "destructive",
              });
              setTestCase(testCase.map((i) => i.code === item.code ? {...i, status: 'FAILED'} : i));
          } else {
              if (res.status === 'PASSED') {
                  if (item.code === 'Case02') {
                      setIsExist(true); 
                  }
                  setTestCase(testCase.map((i) => i.code === item.code ? {...i, status: 'PASSED'} : i));
                  toast({
                      title: "Test Passed",
                      description: `Test case ${item.code} passed successfully`,
                      variant: "success",
                  });
              } else {
                  setTestCase(testCase.map((i) => i.code === item.code ? {...i, status: 'FAILED'} : i));
                  toast({
                      title: "Test Failed",
                      description: `Test case ${item.code} failed`,
                      variant: "destructive",
                  });
              }
          }
      });
  }
  
    function testAll() {
        testCase.forEach(async (item) => {
           await callTestFunc(item)
        })
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
    <div className="w-full max-w-5xl space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
      <Table className="mx-auto">
        <TableCaption>A list of test case</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead>Case</TableHead>
            <TableHead><Button variant={'green'} className='w-[90px] mb-2' onClick={testAll}>Test All</Button></TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {testCase.map((item, index) => (
                <TableRow key={index}>
            <TableCell className="font-medium">{index +1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
                <Button variant={'destructive'} onClick={() => {
                    callTestFunc(item)
                }}>
                    Run Test
                </Button>
            </TableCell>
            <TableCell>
                {item.status === 'FAILED' && (
                    <Button variant={'destructive'}>
                    FAILED
                    </Button>
                )}
                {item.status === 'PASSED' && (
                    <Button variant={'green'}>
                    PASSED
                    </Button>
                )}
                {item.status === 'PENDING' && (
                    <Button variant={'blue'}>
                    PENDING
                    </Button>
                )}
            </TableCell>
          </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  </div>
  
  )
}
