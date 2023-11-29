export interface Uploadresult {
  info: {
    public_id: string;
  };
  event: "success";
}

import React from "react";

import cloudinary from "cloudinary";

import UploadButton from "./gallery/upload-button";

import GalleryGrid from "./gallery/gallery-grid";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image `)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(300)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col gap-8  mt-4">
        <div className="flex justify-between ">
          <h1 className="text-4xl font-bold">Home </h1>
          <UploadButton />
        </div>

        <GalleryGrid images={results.resources} />
      </div>
    </section>
  );
}
