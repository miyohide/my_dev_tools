#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MyDevToolsStack } from "../lib/my-dev-tools-stack";

const app = new cdk.App();

new MyDevToolsStack(app, "MyDevToolsStack", {
  description: "テキスト編集ツール集 - CloudFront + S3 配信構成",
});
