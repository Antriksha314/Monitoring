import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Header } from "@/components/header/header";
import Sidebar from "@/components/sidebar";
import { useGetBucket } from "@/api/get-bucket";
import withAuth from "@/utils/authentication";
import Loader from "@/components/Loader";
import { Box } from "@mui/system";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function UserBucket() {
  const { data: bucket, isLoading: gettingBucketData } = useGetBucket();
  const bucketData = bucket?.data?.bucket ? bucket?.data?.bucket : {};

  function renderTree(treeData: any, fullpath: string) {
    if (Array.isArray(treeData)) {
      return treeData.map((item, index) => (
        <TreeItem nodeId={`${index}`} key={index} label={item} />
      ));
    }
    if (typeof treeData === "object") {
      return (
        <>
          {Object.keys(treeData).map((key, index) => {
            let isLast = false;
            let lastBlockArray;
            if (key.split("/").length === 3) {
              isLast = true;
              lastBlockArray = Object.values(treeData[key]);
            }
            return (
              <>
                {isLast ? (
                  <>
                    <a target={"_blank"} href={`https://pdc-customer-access.s3.amazonaws.com${fullpath}`}>
                      Download
                    </a>
                    {lastBlockArray?.map((key: any) => (
                      <TreeItem nodeId={key} key={key} label={key} />
                    ))}
                  </>
                ) : (
                  <TreeItem nodeId={key} key={key} label={key}>
                    {renderTree(treeData[key], `${fullpath}/${key}`)}
                  </TreeItem>
                )}
              </>
            );
          })}
        </>
      );
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="w-[86%] p-6 ml-auto pt-20">
        {gettingBucketData ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Loader size={80} />
          </Box>
        ) : (
          <Box>
            <TreeView
              aria-label="multi-select"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<FolderOpenIcon />}
              defaultEndIcon={<InsertDriveFileIcon />}
              multiSelect
              sx={{ flexGrow: 1, maxWidth: 700, overflowY: "auto" }}
            >
              {renderTree(bucketData, "")}
            </TreeView>
          </Box>
        )}
      </div>
    </>
  );
}

export default withAuth(UserBucket);
