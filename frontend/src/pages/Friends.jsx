import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { MessageSquare } from "lucide-react";

const Friends = () => {
  const { data: friends, isLoading, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="alert alert-error">
          <span>Failed to load friends list</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>

      {friends?.length === 0 ? (
        <div className="bg-base-200 rounded-lg p-6 text-center">
          <p className="text-base-content opacity-70">
            You haven't added any friends yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends?.map((friend) => (
            <div
              key={friend._id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="avatar relative">
                    <div className="w-16 rounded-full">
                      <img src={friend.profilePic} alt={friend.fullName} />
                    </div>
                    {friend.isOnline && (
                      <span className="absolute bottom-0 right-0 size-4 rounded-full bg-success border-2 border-base-100"></span>
                    )}
                  </div>
                  <div>
                    <h2 className="card-title">{friend.fullName}</h2>
                    <p className="text-sm opacity-70">
                      {friend.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">
                    <MessageSquare className="size-4" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
