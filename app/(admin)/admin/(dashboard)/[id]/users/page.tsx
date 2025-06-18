"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@/lib/api/use-swr";
import { exportData } from "@/lib/utils";
import { UserData } from "@/types";
import Link from "next/link";
import { columns } from "./columns";

const AgentsListPage = () => {
  const { data, error, isLoading } = useQuery<UserData>(
    "/api/v1/users/users",
    "/api/v1/users/users"
  );

  const handleExport = () => {
    exportData(data?.users as object[], {
      fileName: "users",
      fileType: "xlsx",
    });
  };

  return (
    <ContentLayout
      title={`Agents (${data?.users?.length})`}
      className="space-y-8"
      isLoading={isLoading}
      error={error}
    >
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button size={"sm"} onClick={handleExport}>
            Export
          </Button>
          {/* <Button size={"sm"}>Import</Button> */}
          <Button size={"sm"} asChild>
            <Link href={"/agents/register"}>Add Agent</Link>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {data && <DataTable data={data?.users} columns={columns} />}
      </div>
    </ContentLayout>
  );
};

export default AgentsListPage;
