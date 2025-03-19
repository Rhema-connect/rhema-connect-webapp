"use client";

import React from "react";
import InfiniteScrollerComponent from "@/connections/infiniteScrollerComponent";

export default function UserAdmin() {

    const { results, isLoading, ref, isRefetching, refetch } = InfiniteScrollerComponent({
        url: `/admin/users`,
        limit: 10,
      });

    const mockUsers = {
        message: "List of all users",
        data: [
          {
            id: 1,
            firstName: "ekada",
            lastName: "egile",
            middleName: "godstime",
            email: "danielemmanuel257@gmail.com",
            password: "$2a$10$wQ1VtZAhrHv1vt88KKz8TuJYrBhC8OsRU5tJxku7bcMZXprWHW0Oq",
            gender: "MALE",
            phone: "08033634507",
            created_at: "2024-09-04T08:37:37.311Z",
            updated_at: "2024-09-04T08:37:37.311Z"
          },
          {
            id: 2,
            firstName: "Rhema",
            lastName: "connect",
            middleName: "admin",
            email: "operations@rhemaconnect.com",
            password: "$2a$10$ZeJTfPPn4N1WfA69kVfZ5e1n0EyzzEqaa7SOYVR38Y/V9S1FuK2Ua",
            gender: "MALE",
            phone: "+2349078780058",
            created_at: "2024-09-04T09:10:29.071Z",
            updated_at: "2024-09-04T09:10:29.071Z"
          },
          {
            id: 3,
            firstName: "Ekada",
            lastName: "Egileonisofien",
            middleName: "",
            email: "egileoniso.ekada@gmail.com",
            password: "$2a$10$Lb1zfuAdcUNglRn48htq9.YUkEUM89r.P.fIaVq5jYiTAYXZi47S6",
            gender: "MALE",
            phone: "07030697459",
            created_at: "2024-11-13T21:10:00.919Z",
            updated_at: "2024-11-13T21:10:00.919Z"
          },
          {
            id: 4,
            firstName: "Taiwo",
            lastName: "Oladipupo",
            middleName: "",
            email: "taiwo@rhemaconnect.com",
            password: "$2a$10$Re3S93UJWa4jBzH.7PDE1O2zvG7sbH4kgKLY/Ln9bMPOpFAlUcVR.",
            gender: "MALE",
            phone: "+447594550982",
            created_at: "2025-02-18T20:44:22.828Z",
            updated_at: "2025-02-18T20:44:22.828Z"
          }
        ]
      }

      console.log('results',results)


  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-white">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer">
                  <div className="flex items-center leading-[30px] text-[20px] font-bold">Email</div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer">
                  <div className="flex items-center leading-[30px] text-[20px] font-bold">Full Name</div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer">
                  <div className="flex items-center leading-[30px] text-[20px] font-bold">Gender</div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer">
                  <div className="flex items-center leading-[30px] text-[20px] font-bold">
                    Phone Number(whatsapp)
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {results?.map((user: any) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-6 text-sm text-gray-900">{user.email}</td>
                  <td className="px-4 py-6 text-sm text-gray-900">{user.firstName  +" " + user.middleName + " " + user.lastName }</td>
                  <td className="px-4 py-6 text-sm text-gray-900">{user.gender}</td>
                  <td className="px-4 py-6 text-sm text-gray-900">{user.phone}</td>
                  <td className="px-4 py-6 text-sm text-gray-900"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

