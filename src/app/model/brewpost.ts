import { BrewTag } from "./brewtag";
import { BrewLink } from "./brewlink";

export class BrewPost {
    Title: string;
    Author: string;
    PostedAt: string;
    TextContent: string;
    Tags: BrewTag[];
    Links: BrewLink[];

    constructor() {
        this.Tags = [];
        this.Links = [];
    }
}