import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
}

const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2">
        <DialogTrigger>
          <img
            src={url}
            alt="Message image"
            className="rounded-md object-cover size-full cursor-zoom-in"
          />
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="Message image"
          className="rounded-md object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
