import { PDFDocument } from "pdf-lib";

export async function assemblePdf(spreadBuffers: Buffer[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();

  for (const buffer of spreadBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    for (const page of pages) {
      merged.addPage(page);
    }
  }

  return await merged.save({ useObjectStreams: true });
}
