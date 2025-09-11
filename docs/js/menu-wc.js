'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Ionic-SQLite-Tasks</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-48af35b6379e816ae6b21514dea6087c351ffd6fcd47802f658ce06d05884baebacfc86dbd8a24e0029078676148b4f52f34aadbd7e1cffc3fae173fb3a23f57"' : 'data-bs-target="#xs-components-links-module-AppModule-48af35b6379e816ae6b21514dea6087c351ffd6fcd47802f658ce06d05884baebacfc86dbd8a24e0029078676148b4f52f34aadbd7e1cffc3fae173fb3a23f57"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-48af35b6379e816ae6b21514dea6087c351ffd6fcd47802f658ce06d05884baebacfc86dbd8a24e0029078676148b4f52f34aadbd7e1cffc3fae173fb3a23f57"' :
                                            'id="xs-components-links-module-AppModule-48af35b6379e816ae6b21514dea6087c351ffd6fcd47802f658ce06d05884baebacfc86dbd8a24e0029078676148b4f52f34aadbd7e1cffc3fae173fb3a23f57"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CategoriesModule-6372bb487598650ac7f9d0bd531268a1dc9f382146ded2ccbd259c5a7f3fe99845ff9a43cb0869063a039199d0907273d25dbb89cd5780faffe0609840bbe738"' : 'data-bs-target="#xs-components-links-module-CategoriesModule-6372bb487598650ac7f9d0bd531268a1dc9f382146ded2ccbd259c5a7f3fe99845ff9a43cb0869063a039199d0907273d25dbb89cd5780faffe0609840bbe738"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CategoriesModule-6372bb487598650ac7f9d0bd531268a1dc9f382146ded2ccbd259c5a7f3fe99845ff9a43cb0869063a039199d0907273d25dbb89cd5780faffe0609840bbe738"' :
                                            'id="xs-components-links-module-CategoriesModule-6372bb487598650ac7f9d0bd531268a1dc9f382146ded2ccbd259c5a7f3fe99845ff9a43cb0869063a039199d0907273d25dbb89cd5780faffe0609840bbe738"' }>
                                            <li class="link">
                                                <a href="components/ListCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveCategoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesRoutingModule.html" data-type="entity-link" >CategoriesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PagesModule-7a40bb23896af3f535ed2341b98c5a6b217a3945e7420b1df1ed9ab28f148cb9b92f70b7c30ac0ca18c1cb9be2d8ba0b3ee4b9806f668a48faacde59067253d5"' : 'data-bs-target="#xs-components-links-module-PagesModule-7a40bb23896af3f535ed2341b98c5a6b217a3945e7420b1df1ed9ab28f148cb9b92f70b7c30ac0ca18c1cb9be2d8ba0b3ee4b9806f668a48faacde59067253d5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-7a40bb23896af3f535ed2341b98c5a6b217a3945e7420b1df1ed9ab28f148cb9b92f70b7c30ac0ca18c1cb9be2d8ba0b3ee4b9806f668a48faacde59067253d5"' :
                                            'id="xs-components-links-module-PagesModule-7a40bb23896af3f535ed2341b98c5a6b217a3945e7420b1df1ed9ab28f148cb9b92f70b7c30ac0ca18c1cb9be2d8ba0b3ee4b9806f668a48faacde59067253d5"' }>
                                            <li class="link">
                                                <a href="components/TutorialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TutorialComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesRoutingModule.html" data-type="entity-link" >PagesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TasksModule-5bbc2e209ce44f66b3a79af899fc9066475dcca73b216ef3573d6682944383de8cf6bb3c06dc6bfef762dbdfc961dd596f642fc384dbdb9c55f0cf74bb9e4861"' : 'data-bs-target="#xs-components-links-module-TasksModule-5bbc2e209ce44f66b3a79af899fc9066475dcca73b216ef3573d6682944383de8cf6bb3c06dc6bfef762dbdfc961dd596f642fc384dbdb9c55f0cf74bb9e4861"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TasksModule-5bbc2e209ce44f66b3a79af899fc9066475dcca73b216ef3573d6682944383de8cf6bb3c06dc6bfef762dbdfc961dd596f642fc384dbdb9c55f0cf74bb9e4861"' :
                                            'id="xs-components-links-module-TasksModule-5bbc2e209ce44f66b3a79af899fc9066475dcca73b216ef3573d6682944383de8cf6bb3c06dc6bfef762dbdfc961dd596f642fc384dbdb9c55f0cf74bb9e4861"' }>
                                            <li class="link">
                                                <a href="components/FinishTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinishTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveTaskComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksRoutingModule.html" data-type="entity-link" >TasksRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/Alerts.html" data-type="entity-link" >Alerts</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Categories.html" data-type="entity-link" >Categories</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Connection.html" data-type="entity-link" >Connection</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConnectionDb.html" data-type="entity-link" >ConnectionDb</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConnectionSstorage.html" data-type="entity-link" >ConnectionSstorage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/States.html" data-type="entity-link" >States</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Tasks.html" data-type="entity-link" >Tasks</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});