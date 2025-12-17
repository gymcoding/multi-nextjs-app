"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * 금액을 원화 포맷으로 변환하는 함수
 * @param amount - 변환할 금액
 * @returns 포맷팅된 문자열 (예: "10,000원")
 */
function formatCurrency(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

/**
 * 더치페이 계산기 MVP 페이지
 * - 총 금액과 인원 수를 입력받아 1인당 금액을 계산합니다.
 */
export default function DutchPayPage() {
  // 총 금액 상태
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // 인원 수 상태 (기본값: 2명)
  const [peopleCount, setPeopleCount] = useState<number>(2);

  // 1인당 금액 계산 (올림 처리)
  const perPerson = peopleCount > 0 ? Math.ceil(totalAmount / peopleCount) : 0;
  // 나머지 금액 계산 (올림으로 인해 발생하는 차액)
  const remainder = perPerson * peopleCount - totalAmount;

  /**
   * 총 금액 입력 핸들러
   */
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value) || 0;
    // 음수 방지
    setTotalAmount(value < 0 ? 0 : value);
  }

  /**
   * 인원 수 입력 핸들러
   */
  function handlePeopleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value) || 1;
    // 최소 1명 보장
    setPeopleCount(value < 1 ? 1 : value);
  }

  /**
   * 리셋 버튼 핸들러
   */
  function handleReset() {
    setTotalAmount(0);
    setPeopleCount(2);
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md pt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">
              더치페이 계산기
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* 총 금액 입력 */}
            <div className="space-y-2">
              <label
                htmlFor="totalAmount"
                className="text-sm font-medium text-foreground"
              >
                총 금액
              </label>
              <Input
                id="totalAmount"
                type="number"
                placeholder="총 금액을 입력하세요"
                value={totalAmount || ""}
                onChange={handleAmountChange}
                min={0}
              />
            </div>

            {/* 인원 수 입력 */}
            <div className="space-y-2">
              <label
                htmlFor="peopleCount"
                className="text-sm font-medium text-foreground"
              >
                인원 수
              </label>
              <Input
                id="peopleCount"
                type="number"
                placeholder="인원 수를 입력하세요"
                value={peopleCount}
                onChange={handlePeopleChange}
                min={1}
              />
            </div>

            {/* 구분선 */}
            <div className="border-t border-border" />

            {/* 계산 결과 */}
            <div className="space-y-3 rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">인원</span>
                <span className="font-medium">{peopleCount}명</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">1인당 금액</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(perPerson)}
                </span>
              </div>
              {/* 나머지 금액 표시 (있을 경우) */}
              {remainder > 0 && totalAmount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    올림으로 인한 차액
                  </span>
                  <span className="text-muted-foreground">
                    +{formatCurrency(remainder)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleReset}
            >
              초기화
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
