export const config = {
  api: {
    bodyParser: false, // Disable Next.js' built-in body parser for file handling
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Collect file data from the request
      const buffers: Buffer[] = [];

      req.on("data", (chunk) => {
        buffers.push(chunk);
      });

      req.on("end", async () => {
        // Combine all the buffer chunks into a single buffer
        const data = Buffer.concat(buffers);

        // Parse multipart form data manually to extract the file (simplified example)
        const boundary = req.headers["content-type"].split("boundary=")[1];
        const parts = data.toString().split(`--${boundary}`);

        // Filter out the part containing the file (assuming FormData field is named 'file')
        const filePart = parts.find((part) => part.includes("filename="));

        // Extract the file's content between CRLF boundaries (simplified parsing)
        if (!filePart) {
          throw new Error("File part not found in the request");
        }
        const fileContent = filePart.split("\r\n\r\n")[1].split("\r\n--")[0];

        // At this point, you have the file content as a string
        console.log("Received file content:", fileContent);

        res
          .status(200)
          .json({ message: "File received successfully", fileContent });
      });
    } catch (error) {
      console.error("Error receiving file:", error);
      res.status(500).json({ message: "Error processing file", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
