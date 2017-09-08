(function () {

    angular.module('app')
        .controller('MapController', function ($scope, FlashService, $timeout) {
            var vm = this;

            var map = vm.map;
            var contentString = vm.contentString;
            var marker = vm.marker;
            var infoWindow = vm.infoWindow;
            var address = vm.address;

            vm.fullAddress = {};

            vm.bartabAddress = {};

            vm.bartabAddressFields = [{
                key: 'barLocation',
                type: 'input',
                templateOptions: {
                    label: 'Bar Name',
                    placeholder: 'Enter Bar Name',
                    required: true
                }
            },
                {
                    key: 'address',
                    type: 'input',
                    templateOptions: {
                        label: 'Address',
                        placeholder: 'Enter your address',
                        required: true
                    }
                }, {
                    key: 'city',
                    type: 'input',
                    templateOptions: {
                        label: 'City',
                        placeholder: 'Enter your city',
                        required: true
                    }
                }, {
                    key: 'state',
                    type: 'select',
                    templateOptions: {
                        label: 'State',
                        required: true,
                        options: [
                            {name: 'Tennessee', value: 'TN'},
                            {name: 'Texas', value: 'TX'}
                        ]
                    }
                }, {
                    key: 'zipCode',
                    type: 'input',
                    templateOptions: {
                        label: 'Zip Code',
                        placeholder: 'Enter your zip code',
                        required: true
                    }
                }, {
                    key: 'saveLocation',
                    type: 'checkbox',
                    templateOptions: {
                        label: 'Save Location?'
                    }
                }];

            //     [
            //     {
            //         key: 'address_line_1',
            //         type: 'input',
            //         templateOptions: {
            //             type: 'text',
            //             label: 'Address Line 1',
            //             placeholder: 'Enter address line 1',
            //             required: 'true'
            //         }
            //     }
            // ];

            function initMap() {

                vm.contentString = 'Address to be displayed here';

                vm.map = new google.maps.Map(document.getElementById('map-canvas'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 15
                });

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        vm.map.setCenter(pos);
                    }, function () {
                        handleLocationError(true, vm.infoWindow, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, vm.infoWindow, map.getCenter());
                }
                vm.infoWindow = new google.maps.InfoWindow({
                    content: vm.contentString,
                    maxWidth: 500
                });

            }

            function initMarker() {
                vm.marker = new google.maps.Marker({
                    position: vm.map.center,
                    map: vm.map,
                    title: 'Your Location'
                });
            }

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
                infoWindow.open(map);
            }

            function initListeners() {
                google.maps.event.addListener(vm.marker, 'click', function () {
                    vm.infoWindow.open(vm.map, vm.marker);
                });
            }

            function geocodeLatLng(geocoder, map, infowindow) {
                var input = map.getCenter();
                var latlng = {lat: input.lat(), lng: input.lng()};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === 'OK') {
                        if (results[0]) {
                            vm.address = results[0];
                            infowindow.setContent(results[0].formatted_address);
                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            }

            function initGeoCode() {
                var geocoder = new google.maps.Geocoder;
                geocodeLatLng(geocoder, vm.map, vm.infoWindow);
            }

            initMap();
            $timeout(function () {
                initMarker();
                initGeoCode();
                initListeners();
            }, 1000);
        });
})();