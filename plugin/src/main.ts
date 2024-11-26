import { emit, on, showUI } from "@create-figma-plugin/utilities"
import { nodeToObject } from "@figma-plugin/helpers"
import { textParser } from "./parser"
import {
  ReqDocumentTitleHandler,
  ReqSerializeJsonHandler,
  ResDocumentTitleHandler,
  ResSerializeJsonHandler
} from "./types"

export default function () {
  on<ReqSerializeJsonHandler>("REQ_SERIALIZE_JSON", async function () {
    const json = nodeToObject(figma.root)
    const textNodes = textParser(json)
    emit<ResSerializeJsonHandler>("RES_SERIALIZE_JSON", JSON.stringify(textNodes))

  })
  on<ReqDocumentTitleHandler>("REQ_DOCUMENT_TITLE", async function () {
    const title = figma.root.name
    console.log("Plugin Document Title:", title)
    emit<ResDocumentTitleHandler>("RES_DOCUMENT_TITLE", title)
  })
  showUI({height: 120, width: 320})
}
