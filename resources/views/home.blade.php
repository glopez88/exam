@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Contacts
                    <a href="" class="float-right btn btn-primary" data-toggle="modal" data-target="#addContactModal">add contact</a>
                </div>

                <div class="card-body">
                    <table class="table" id="contact-lists">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbod>
                            <tr style="display:none;" class="no-contacts">
                                <td colspan="4">No registered contacts. </td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="display: none;" id="contacts-pagination"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="errorModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="mt-3">Oops, Something went wrong!</h3>
                <p id="errorMessage" style="font-size: 18px;" class="mt-5"></p>

                <p><button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button></p>
            </div>
        </div>
    </div>
</div>

@include('contacts.index')

@endsection
