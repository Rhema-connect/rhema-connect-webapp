"use client";

import React, { useEffect, useState, useRef } from "react";
import InfiniteScrollerComponent from "@/connections/infiniteScrollerComponent";

export default function UserAdmin() {
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Track if more data is being fetched

  // Using InfiniteScrollerComponent for fetching initial data
  const { results, isLoading, ref, isRefetching, refetch } = InfiniteScrollerComponent({
    url: `/admin/users`,
    limit: 10,
  });

  // Create a ref for the container element to listen to scroll events
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchMoreData = () => {
    if (isFetchingMore || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const bottom = scrollContainer.scrollHeight === scrollContainer.scrollTop + scrollContainer.clientHeight;

    if (bottom) {
      setIsFetchingMore(true); 
      refetch();
    }
  };

  // Set up a scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", fetchMoreData);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", fetchMoreData);
      }
    };
  }, [isFetchingMore]);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div
          className="overflow-x-auto overflow-y-auto max-h-[400px]" // Add max-height for scrollable container
          ref={scrollContainerRef}
        >
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
                  <td className="px-4 py-6 text-sm text-gray-900">
                    {user.firstName + " " + user.middleName + " " + user.lastName}
                  </td>
                  <td className="px-4 py-6 text-sm text-gray-900">{user.gender}</td>
                  <td className="px-4 py-6 text-sm text-gray-900">{user.phone}</td>
                  <td className="px-4 py-6 text-sm text-gray-900"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isLoading || isFetchingMore ? (
          <div className="text-center py-4">Loading more users...</div>
        ) : null}
      </div>
    </div>
  );
}
