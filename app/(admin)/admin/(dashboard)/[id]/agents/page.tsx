"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@/lib/api/use-swr";
import { exportData } from "@/lib/utils";
import { UserData } from "@/types";
import { columns } from "./columns";

const AgentsListPage = () => {
  const { data, error, isLoading } = useQuery<UserData>(
    "/api/v1/users/agents",
    "/api/v1/users/agents"
  );

  const handleExport = () => {
    exportData(data?.users as object[], {
      fileName: "agents",
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
        </div>
      </div>
      <div className="space-y-4">
        {data && <DataTable data={data?.users} columns={columns} />}
      </div>
    </ContentLayout>
  );
};

export default AgentsListPage;
