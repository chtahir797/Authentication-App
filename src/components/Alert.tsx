"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function Alert({alertTitle,alertDescription}:{alertTitle:string,alertDescription:string}) {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      type="submit"
      className="w-full py-3 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500"
      onClick={() => {
        toast({
          title: alertTitle,
          description: alertDescription,
        })
      }}
    >
      Submit
    </Button>
  )
}
