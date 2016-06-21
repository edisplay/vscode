/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import nls = require('vs/nls');
import { TPromise } from 'vs/base/common/winjs.base';
import Event from 'vs/base/common/event';
import { IPager } from 'vs/base/common/paging';
import { createDecorator, ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';

export interface IExtensionManifest {
	name: string;
	publisher: string;
	version: string;
	engines: { vscode: string };
	displayName?: string;
	description?: string;
	main?: string;
	icon?: string;
}

export interface IGalleryVersion {
	version: string;
	date: string;
	manifestUrl: string;
	readmeUrl: string;
	downloadUrl: string;
	iconUrl: string;
	downloadHeaders: { [key: string]: string; };
}

export interface IExtensionIdentity {
	name: string;
	publisher: string;
}

export interface IGalleryExtension {
	id: string;
	name: string;
	displayName: string;
	publisherId: string;
	publisher: string;
	publisherDisplayName: string;
	description: string;
	installCount: number;
	rating: number;
	ratingCount: number;
	versions: IGalleryVersion[];
}

export interface IGalleryMetadata {
	id: string;
	publisherId: string;
	publisherDisplayName: string;
}

export interface ILocalExtension {
	id: string;
	manifest: IExtensionManifest;
	metadata: IGalleryMetadata;
	path: string;
	readmeUrl: string;
}

export const IExtensionManagementService = createDecorator<IExtensionManagementService>('extensionManagementService');
export const IExtensionGalleryService = createDecorator<IExtensionGalleryService>('extensionGalleryService');

export interface IQueryOptions {
	text?: string;
	ids?: string[];
	pageSize?: number;
}

export interface IExtensionGalleryService {
	serviceId: ServiceIdentifier<any>;
	isEnabled(): boolean;
	query(options?: IQueryOptions): TPromise<IPager<IGalleryExtension>>;
}

export type InstallExtensionEvent = { id: string; gallery?: IGalleryExtension; };
export type DidInstallExtensionEvent = { id: string; local?: ILocalExtension; error?: Error; };

export interface IExtensionManagementService {
	serviceId: ServiceIdentifier<any>;

	onInstallExtension: Event<InstallExtensionEvent>;
	onDidInstallExtension: Event<DidInstallExtensionEvent>;
	onUninstallExtension: Event<string>;
	onDidUninstallExtension: Event<string>;

	install(extension: IGalleryExtension): TPromise<void>;
	install(zipPath: string): TPromise<void>;
	uninstall(extension: ILocalExtension): TPromise<void>;
	getInstalled(includeDuplicateVersions?: boolean): TPromise<ILocalExtension[]>;
}

export const IExtensionTipsService = createDecorator<IExtensionTipsService>('extensionTipsService');

export interface IExtensionTipsService {
	serviceId: ServiceIdentifier<IExtensionTipsService>;
	getRecommendations(): TPromise<ILocalExtension[]>;
}

export const ExtensionsLabel = nls.localize('extensions', "Extensions");
export const ExtensionsChannelId = 'extensions';