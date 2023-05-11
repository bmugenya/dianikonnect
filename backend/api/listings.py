from flask import request, url_for,jsonify,json,Blueprint
import requests
from api import db
from api.models import *
import json

listings = Blueprint('listings', __name__)

@listings.route('/listings', methods=['POST'])
def listing():
    data = request.get_json()
    print(data)
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    location_value_json = json.dumps(data.get('location_value'))
    data['location_value'] = location_value_json

    listing = Listing(**data)
    db.session.add(listing)
    db.session.commit()
    return jsonify({'message': 'Listing created successfully'})
 


@listings.route('/listings', methods=['GET'])
def get_listing():
    listings = Listing.query.all()
    if listings:
        for listing in listings:
            print(listing)
        serialized_listings = [listing.serialize() for listing in listings]
        return jsonify(serialized_listings)
    else:
        return jsonify({'message': 'No listings available'}), 404


@listings.route('/listing/<int:id>', methods=['GET'])
def get_single_listing(id):
    listing = Listing.query.filter_by(id=id).first()
    if listing:
        return jsonify(listing.serialize()), 200
    else:
        return jsonify({'message': 'No listings available'}), 404



@listings.route('/favorite', methods=['POST'])
def favorite():
    data = request.get_json()
    print(data)
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    favorite= Favorite(**data)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite created successfully'})



@listings.route('/favorite/<int:id>', methods=['DELETE'])
def remove_favorite(id):
    listing = Listing.query.get(id)
    if listing:
        db.session.delete(listing)
        db.session.commit()
        return jsonify({'message': 'Listing removed successfully'}), 200
    else:
        return jsonify({'message': 'Listing not found'}), 404

