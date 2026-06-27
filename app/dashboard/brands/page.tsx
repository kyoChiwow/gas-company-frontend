"use client"

import NameDescriptionDialog from "@/components/modules/products/NameDescriptionForm";
import { Button } from "@/components/ui/button";

export default function Brands() {
  return (
    <div>
      <NameDescriptionDialog
        entityName="Brand"
        trigger={<Button>Add Brand</Button>}
        onSubmit={async (values) => {
          console.log(values);
        }}
      />
    </div>
  );
}
