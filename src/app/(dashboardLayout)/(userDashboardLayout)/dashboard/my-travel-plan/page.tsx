import { getMyTravelPlans } from "@/service/admin/travelPlanManagement";
import TravelPlansTable from "@/components/modules/Admin/TravelManagement/TravelsTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Suspense } from "react";
import TravelPlanManagementHeader from "@/components/modules/Admin/TravelManagement/TravelsManagementHeader";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";


const MyTravelPlansPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const travelPlansResult = await getMyTravelPlans(queryString);

    const totalPages = Math.ceil(
        (travelPlansResult?.meta?.total || 1) / (travelPlansResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <TravelPlanManagementHeader />
            <h1 className="text-2xl font-bold">My Travel Plans</h1>

            <Suspense fallback={<TableSkeleton columns={7} rows={5} />}>
                <TravelPlansTable travelPlans={travelPlansResult?.data || []} />
                <TablePagination
                    currentPage={travelPlansResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default MyTravelPlansPage;
