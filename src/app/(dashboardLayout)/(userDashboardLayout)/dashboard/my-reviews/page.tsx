/* eslint-disable @typescript-eslint/no-explicit-any */
// import MyReviewsClient from "./MyReviewsClient";
import { getMyReviews } from "@/service/review/reviews.services";
import { getUserInfo } from "@/service/auth/getUserInfo";
import MyReviewsClient from "@/components/modules/Review/MyReviewsClient";

// export const dynamic = "force-dynamic";

const MyReviewsPage = async () => {
  // server-side fetch user info
  const user = await getUserInfo();
  const userEmail = user?.email || "";

  // server-side fetch reviews
  const result = await getMyReviews();
  const reviews = result.success
    ? (result.data || []).map((r: any) => ({
        ...r,
        isOwn: r.user?.email === userEmail,
      }))
    : [];

  return (
    <MyReviewsClient initialReviews={reviews} />
  );
};

export default MyReviewsPage;

















// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";

// import { getReviewsByPlan, deleteReview, updateReview, getMyReviews } from "@/service/review/reviews.services";
// import { IReviewCreate } from "@/types/review.interface";
// import { getUserInfo } from "@/service/auth/getUserInfo";

// export default function MyReviewsPage() {
//     const [reviews, setReviews] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [editingReview, setEditingReview] = useState<any | null>(null);
//     const [formData, setFormData] = useState({ rating: 5, comment: "" });
//     const [userEmail, setUserEmail] = useState<string>("");

//     // fetch logged-in user email
//     useEffect(() => {
//         const fetchUser = async () => {
//             const user = await getUserInfo();
//             if (user?.email) setUserEmail(user.email);
//         };
//         fetchUser();
//     }, []);

//     useEffect(() => {
//         if (!userEmail) return;

//         const fetchReviews = async () => {
//             try {
//                 const result = await getMyReviews(); // <-- user-specific endpoint
//                 if (result.success) {
//                     // mark isOwn true for all, because it's the logged-in user's reviews
//                     const reviewsWithOwnership = (result.data || []).map((r: any) => ({
//                         ...r,
//                         isOwn: true,
//                     }));
//                     setReviews(reviewsWithOwnership);
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchReviews();
//     }, [userEmail]);

//     console.log("userEmail:", userEmail);
//     console.log("reviews:", reviews);


//     // handle delete
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure to delete this review?")) return;
//         const result = await deleteReview(id);
//         if (result.success) {
//             setReviews(reviews.filter(r => r.id !== id));
//         }
//     };

//     // handle edit
//     const handleEdit = (review: any) => {
//         setEditingReview(review);
//         setFormData({ rating: review.rating, comment: review.comment || "" });
//     };

//     const handleSubmit = async () => {
//         if (!editingReview) return;

//         const result = await updateReview(editingReview.id, formData as IReviewCreate);
//         if (result.success) {
//             setReviews(reviews.map(r => r.id === editingReview.id ? { ...r, ...formData } : r));
//             setEditingReview(null);
//             setFormData({ rating: 5, comment: "" });
//         } else {
//             alert(result.message || "Failed to update review");
//         }
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
//             {reviews.length === 0 ? (
//                 <p>No reviews yet.</p>
//             ) : (
//                 reviews.map(r => (
//                     <div key={r.id} className="border p-3 rounded mb-2 flex justify-between items-start">
//                         <div>
//                             <p className="font-semibold">{r.user?.name}</p>
//                             <p>Rating: {r.rating} / 5</p>
//                             {r.comment && <p>Comment: {r.comment}</p>}
//                         </div>
//                         {r.isOwn && (
//                             <div className="flex gap-2">
//                                 <button
//                                     className="px-2 py-1 bg-yellow-400 text-white rounded"
//                                     onClick={() => handleEdit(r)}
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     className="px-2 py-1 bg-red-500 text-white rounded"
//                                     onClick={() => handleDelete(r.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 ))
//             )}

//             {editingReview && (
//                 <div className="mt-4 border-t pt-4">
//                     <h2 className="font-bold mb-2">Edit Review</h2>
//                     <label className="block mb-2">
//                         Rating:
//                         <input
//                             type="number"
//                             min={1}
//                             max={5}
//                             value={formData.rating}
//                             onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
//                             className="border p-1 rounded ml-2 w-20"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         Comment:
//                         <textarea
//                             value={formData.comment}
//                             onChange={e => setFormData({ ...formData, comment: e.target.value })}
//                             className="border p-2 rounded w-full"
//                         />
//                     </label>
//                     <button
//                         onClick={handleSubmit}
//                         className="px-4 py-2 bg-blue-600 text-white rounded"
//                     >
//                         Save
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

