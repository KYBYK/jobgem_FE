"use client"

import { useState } from 'react'

export default function SearchPwdPage() {
    const [memberType, setMemberType] = useState('individual')
    const [companyType, setCompanyType] = useState('forProfit')

    return (

            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-2xl font-bold mb-6">회원정보 입력</h1>
                <p className="mb-4 text-gray-600">회원 구분별로 가입 시 입력한 정보를 입력해 주세요.</p>

                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">개인회원</h2>
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="individual"
                                name="memberType"
                                value="individual"
                                checked={memberType === 'individual'}
                                onChange={() => setMemberType('individual')}
                                className="mr-2"
                            />
                            <label htmlFor="individual">이메일 인증</label>
                            <input
                                type="radio"
                                id="corporate"
                                name="memberType"
                                value="corporate"
                                checked={memberType === 'corporate'}
                                onChange={() => setMemberType('corporate')}
                                className="ml-4 mr-2"
                            />
                            <label htmlFor="corporate">휴대폰 인증</label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                이름
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="이름"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <input
                                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="이메일"
                            />
                            <span className="mx-2 py-2">@</span>
                            <select
                                className="shadow border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>선택하세요</option>
                                {/* Add more options here */}
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">사업자회원</h2>
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="forProfit"
                                name="companyType"
                                value="forProfit"
                                checked={companyType === 'forProfit'}
                                onChange={() => setCompanyType('forProfit')}
                                className="mr-2"
                            />
                            <label htmlFor="forProfit">기업회원</label>
                            <input
                                type="radio"
                                id="nonProfit"
                                name="companyType"
                                value="nonProfit"
                                checked={companyType === 'nonProfit'}
                                onChange={() => setCompanyType('nonProfit')}
                                className="ml-4 mr-2"
                            />
                            <label htmlFor="nonProfit">서치펌회원</label>
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="companyName"
                                type="text"
                                placeholder="기업명칭"
                            />
                        </div>
                        <div className="mb-4 flex space-x-2">
                            <input
                                className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="사업자등록번호"
                            />
                            <input
                                className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=""
                            />
                            <input
                                className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            아이디 찾기
                        </button>
                    </div>
                </form>
            </div>
    )
}