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
                    <a href="index.html" data-type="index-link">termin-app-v2 documentation</a>
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
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-034b4a9400856e536627ad8ac7a5bcb5"' : 'data-target="#xs-components-links-module-AppModule-034b4a9400856e536627ad8ac7a5bcb5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-034b4a9400856e536627ad8ac7a5bcb5"' :
                                            'id="xs-components-links-module-AppModule-034b4a9400856e536627ad8ac7a5bcb5"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppointmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppointmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BottomSheetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BottomSheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatetimepickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatetimepickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormAppointmentAddNoteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormAppointmentAddNoteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDeleteAppointmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormDeleteAppointmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDeleteMedicineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormDeleteMedicineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDeletePatientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormDeletePatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDeletePrescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormDeletePrescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormNewAppointmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormNewAppointmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormNewPatientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormNewPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormNewPrescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormNewPrescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MedicineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MedicineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrescriptionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Address.html" data-type="entity-link">Address</a>
                            </li>
                            <li class="link">
                                <a href="classes/Appointment.html" data-type="entity-link">Appointment</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppointmentRecord.html" data-type="entity-link">AppointmentRecord</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomDateFormatter.html" data-type="entity-link">CustomDateFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateConfig.html" data-type="entity-link">DateConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/Disease.html" data-type="entity-link">Disease</a>
                            </li>
                            <li class="link">
                                <a href="classes/Medicine.html" data-type="entity-link">Medicine</a>
                            </li>
                            <li class="link">
                                <a href="classes/Patient.html" data-type="entity-link">Patient</a>
                            </li>
                            <li class="link">
                                <a href="classes/Prescription.html" data-type="entity-link">Prescription</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateUniqueValues.html" data-type="entity-link">ValidateUniqueValues</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppointmentService.html" data-type="entity-link">AppointmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicineService.html" data-type="entity-link">MedicineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientService.html" data-type="entity-link">PatientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrescriptionService.html" data-type="entity-link">PrescriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link">ErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/RequestInterceptor.html" data-type="entity-link">RequestInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});