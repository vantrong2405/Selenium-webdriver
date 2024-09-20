/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { callTest } from "../auth/(functionHandler)/function";
import { TestCase, initTestCase } from "../../constants/data";
import { useToast } from "../../components/ui/use-toast";
import { Header } from "@/components/component/header";

export default function page() {
  const { toast } = useToast();
  const [testCase, setTestCase] = useState<TestCase[]>(initTestCase);
  const [isExist, setIsExist] = useState(false);
  async function callTestFunc(item: TestCase) {
    console.log(item);
    
    callTest(item.code).then(res => {
      
      if (item.code === "Case02" && isExist) {
        toast({
          title: "Test Failed",
          description: `Test case ${item.code} is not allowed to run more than once`,
          variant: "destructive"
        });
        setTestCase(
          testCase.map(
            i => (i.code === item.code ? { ...i, status: "FAILED" } : i)
          )
        );
      } else if (item.code === "Case05" && !isExist) {
        toast({
          title: "Test Failed",
          description: `Test case ${item.code} cannot pass because required condition is not met`,
          variant: "destructive"
        });
        setTestCase(
          testCase.map(
            i => (i.code === item.code ? { ...i, status: "FAILED" } : i)
          )
        );
      } else {
        if (res.status === "PASSED") {
          if (item.code === "Case02") {
            setIsExist(true);
          }
          setTestCase(
            testCase.map(
              i => (i.code === item.code ? { ...i, status: "PASSED" } : i)
            )
          );
          toast({
            title: "Test Passed",
            description: `Test case ${item.code} passed successfully`,
            variant: "success"
          });
        } else {
          setTestCase(
            testCase.map(
              i => (i.code === item.code ? { ...i, status: "FAILED" } : i)
            )
          );
          toast({
            title: "Test Failed",
            description: `Test case ${item.code} failed`,
            variant: "destructive"
          });
        }
      }
    });
  }

  function testAll() {
    testCase.forEach(async item => {
      await callTestFunc(item);
    });
  }
  return (
    <div className="min-h-screen items-center justify-center bg-gray-800">
      <Header />
      <div className="flex  dark:bg-gray-950 p-4">
        <div className="w-full  space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
          <Table className="w-full mx-auto bg-white">
            <TableCaption>A list of test cases</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                  #
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">
                  Case
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">
                 Run 
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">
                  Result
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testCase.map((item, index) =>
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <TableCell className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {item.name}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm">
                    <Button
                      variant="default"
                      className="transition-colors"
                      onClick={() => callTestFunc(item)}
                    >
                      Run Test
                    </Button>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm">
                    {item.status === "FAILED" &&
                      <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 transition-colors"
                      >
                        FAILED
                      </Button>}
                    {item.status === "PASSED" &&
                      <Button
                        variant="green"
                        className="bg-green-500 hover:bg-green-600 transition-colors"
                      >
                        PASSED
                      </Button>}
                    {item.status === "PENDING" &&
                      <Button
                        variant="blue"
                        className="bg-blue-500 hover:bg-blue-600 transition-colors"
                      >
                        PENDING
                      </Button>}
                  </TableCell>
                </TableRow>
              )}
                  <TableRow
             
                >
                  <TableCell className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
               
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm">
                        <Button
                          variant="destructive"
                          className=" hover:bg-red-600 transition-colors"
                          onClick={testAll}
                        >
                          Run All Tests
                        </Button>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm">
                  
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
